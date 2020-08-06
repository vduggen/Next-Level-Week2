import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";
import { Response, Request } from "express";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
          .whereRaw("`class_schedule`. `from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`. `to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    // Desestruturando e pegando os dados do body da req
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    // Pra caso der alguma merda na execução desfazer as query's
    const trx = await db.transaction();

    try {
      // Inserindo na tabela users os dados
      const insertUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      // Pegando Id da query anterior, como foi só 1 insert só pegamos da primeira posição
      const user_id = insertUsersIds[0];

      // Inserindo na tabela classes os dados
      const insertClassesId = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      // Pegando Id da query anterior, como foi só 1 insert só pegamos da primeira posição
      const class_id = insertClassesId[0];

      // Formatando os dados para enviar para o bd
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      // Inserindo na tabela class_schedule os dados
      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      // Caso de erro desfaz tudo
      await trx.rollback();

      return response.status(400).json({
        errorMessage: "Unexpected error while creating new class",
        error: err,
      });
    }
  }
}

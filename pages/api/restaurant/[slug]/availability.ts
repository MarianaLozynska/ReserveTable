import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import { findAvailabletables } from "../../../../services/restaurant/findAvailabletables";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    if (!day || !time || !partySize) {
      return res.status(400).json({ errorMessage: "Invalid data provided" });
    }
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        close_time: true,
        open_time: true,
      },
    });
    if (!restaurant) {
      return res.status(400).json({ errorMessage: "Invalid data provided" });
    }

    const searchTimesWithTables = await findAvailabletables({
      time,
      day,
      res,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(400).json({ errorMessage: "Invalid data provided" });
    }
    const availabilities = searchTimesWithTables
      .map((t) => {
        const sumseats = t.tables.reduce((sum, table) => {
          return sum + table.seats;
        }, 0);
        return {
          time: t.time,
          available: sumseats >= parseInt(partySize),
        };
      })
      .filter((availability) => {
        const timeAfterOpeningHours =
          new Date(`${day}T${availability.time}`) >=
          new Date(`${day}T${restaurant.open_time}`);
        const timeBeforeClosingHours =
          new Date(`${day}T${availability.time}`) <=
          new Date(`${day}T${restaurant.close_time}`);
        return timeAfterOpeningHours && timeBeforeClosingHours;
      });
    return res.status(200).json(availabilities);
  }
}

import { pingNow } from "../repositories/HealthRepository.js";

export async function dbPing(req, res, next) {
  try {
    const r = await pingNow();
    res.json({ db: "ok", now: r.now });
  } catch (e) { next(e); }
}

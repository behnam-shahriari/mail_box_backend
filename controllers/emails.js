const handleTotalEmailsGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("messages")
    .where("receiver_id", "=", id)
    .returning("emails")
    .orderBy("date_sent", "desc")
    .then((emails) => {
      res.json({ count: emails.length, data: emails });
    })
    .catch((err) => res.status(400).json("error getting emails"));
};

const handleMessage = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("messages")
    .where("id", "=", id)
    .returning("emails")
    .then((emails) => {
      res.json(emails);
    })
    .catch((err) => res.status(400).json("error getting emails"));
};

module.exports = {
  handleTotalEmailsGet,
  handleMessage,
};

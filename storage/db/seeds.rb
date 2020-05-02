QuestionPack.destroy_all
QuestionPack.create!(
  author: "anonymous",
  event_name: "World Championship",
  event_id: "1",
  difficulty: QuestionPack::HARD,
  user_id: "1"
)
QuestionPack.create!(
  author: "anonymous",
  event_name: "World Championship",
  event_id: "1",
  difficulty: QuestionPack::MEDIUM,
  user_id: "1"
)
QuestionPack.create!(
  author: "anonymous",
  event_name: "World Championship",
  event_id: "1",
  difficulty: QuestionPack::SIMPLE,
  user_id: "1"
)

QuestionPack.all.each do |pack|
  pack.document.attach(
    io: StringIO.new('{"dummy data": true}'),
    filename: "dummydata.json"
  )
end

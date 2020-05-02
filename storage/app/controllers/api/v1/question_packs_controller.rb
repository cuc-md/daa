class Api::V1::QuestionPacksController < ApplicationController
  def create
    pack = QuestionPack.create!(permitted_create_params)
    pack.document.attach(io: blob_io, filename: pack.event_name + SecureRandom.uuid)
    render_pack(pack, :created)
  end

  def index
    packs = QuestionPack.select(:id, :difficulty, :event_name)
    packs = packs.where(difficulty: params[:difficulty]) if params[:difficulty]
    render_packs(packs)
  end

  def show
    render_pack(pack)
  end

  def destroy
    pack.document.purge
    pack.destroy!
    render_pack(pack)
  end

  def update
    pack.update!(permitted_update_params)
    pack.document.attach(io: blob_io, filename: pack.event_name.to_s + SecureRandom.uuid) if blob
    render_pack(pack)
  end

  def random
    pack = QuestionPack.order("random()")
    pack = pack.where(difficulty: params[:difficulty]) if params[:difficulty]

    render_pack(pack.first!)
  end

  def document
    send_data pack.document.download, filename: pack.document.filename.to_s, type: pack.document.content_type
  end

  private

  def permitted_create_params
    params.require(:question_pack).permit(:author, :event_name, :user_id, :difficulty)
  end

  def permitted_update_params
    params.require(:question_pack).permit(:author, :event_name, :difficulty)
  end

  def pack
    @pack ||= QuestionPack.find(params[:id])
  end

  def blob_io
    @blob_io ||= StringIO.new(Base64.strict_decode64(blob))
  rescue ArgumentError
    raise ActiveRecord::ValidationFailed
  end

  def blob
    @blob ||= params.dig(:question_pack, :blob)
  end

  def render_pack(pack, status = :ok)
    render status: status, json: {
      data: {
        question_pack: {
          id:         pack.id,
          user_id:    pack.user_id,
          event_name: pack.event_name,
          difficulty: pack.difficulty,
          author:     pack.author
        }
      }
    }
  end

  def render_packs(packs)
    render json: {
      data: {
        question_packs: packs.map do |pack|
          {
            id:         pack.id,
            event_name: pack.event_name,
            difficulty: pack.difficulty
          }
        end
      }
    }
  end
end

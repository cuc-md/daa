class Api::V1::ResultsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :details, :sample]

  def create
    authorize :result
    params[:result][:teams] = team_results
    params[:result].delete(:blob)
    params[:result][:user_id] = current_user.id
    render json: service.create, status: service.status
  end

  def show
    render json: service.show, status: service.status
  end

  def update
    authorize :result
    params[:result] = team_results
    params[:result][:user_id] = current_user.id
    render json: service.update, status: service.status
  end

  def destroy
    authorize :result
    render json: service.destroy, status: service.status
  end

  def details
    render json: service.details, status: service.status
  end

  def sample
    xlsx = RubyXL::Workbook.new
    sheet = xlsx[0]
    sheet.sheet_name = "Results"
    sheet.add_cell(0, 0, "Teams")
    40.times do |question|
        sheet.add_cell(0, 1 + question, "Q#{1 + question}")
    end
    send_data xlsx.stream, filename: "sample-form.xlsx", type: "application/vnd.ms-excel"
  end

  private

  def service
    @service ||= ResultsService.new(params)
  end

  def blob_io
    @blob_io ||= StringIO.new(Base64.strict_decode64(blob))
  end

  def blob
    @blob ||= params.dig(:result, :blob)
  end

  def team_results
    xlsx  = RubyXL::Parser.parse_buffer(blob_io)
    sheet = xlsx["Results"]

    row = 1
    team_results = {}
    while sheet[row] && sheet[row][0]
      team = sheet[row][0].value
      results = (1..41).map { |column| sheet[row][column].value.to_i rescue 0 }
      team_results[team] = results
      row += 1
    end

    team_results
  end
end

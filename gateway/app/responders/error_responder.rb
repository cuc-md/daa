module ErrorRespoder
  protected

  def json_resource_errors
    {
      success: false,
      errors: resource.errors.as_json
    }
  end
end

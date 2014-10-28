json.array!(@zencontrollers) do |zencontroller|
  json.extract! zencontroller, :id
  json.url zencontroller_url(zencontroller, format: :json)
end

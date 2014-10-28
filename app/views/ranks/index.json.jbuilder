json.array!(@ranks) do |rank|
  json.extract! rank, :id, :name, :min_points, :logo, :sort_order
  json.url rank_url(rank, format: :json)
end

require 'sinatra'

post '/storedis' do
  contents = Hash.new
  params.map {|k,v| contents[k] = v }
  File.open("thedatabase.database", "a+") do |f|
    f.puts Marshal.dump(contents)
  end
end
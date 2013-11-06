$:.push(File.expand_path('.'),
		File.expand_path('lib'))

require 'bundler'
Bundler.setup

require 'cookies'
run Sinatra::Application
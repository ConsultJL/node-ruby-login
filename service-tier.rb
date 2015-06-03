require 'sinatra'
require 'JSON'

post '/checkLogin' do 
	if (params['username'] == 'jeremy') && (params['password'] == 'jeremy')
		'success'.to_json
	else
		'fail'.to_json
	end
end

get '/checkLogin' do 
	if (params['username'] == 'jeremy') && (params['password'] == 'jeremy')
		'success'.to_json
	else
		'fail'.to_json
	end
end

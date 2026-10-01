require 'webrick'

WEBrick::HTTPUtils::DefaultMimeTypes['webp'] = 'image/webp'

root = File.expand_path(File.dirname(__FILE__))
port = 3000

class MultiPageServlet < WEBrick::HTTPServlet::FileHandler
  def do_GET(req, res)
    path = req.path
    # Si la route n'a pas d'extension et qu'un fichier .html correspondant existe, on le sert
    if path != '/' && !path.include?('.')
      clean_path = path.sub(/^\//, '')
      html_file = File.join(@root, "#{clean_path}.html")
      if File.exist?(html_file)
        req.instance_variable_set(:@path_info, "/#{clean_path}.html")
      end
    end
    super(req, res)
  end
end

server = WEBrick::HTTPServer.new(
  :Port => port,
  :DocumentRoot => root,
  :Logger => WEBrick::Log.new($stderr, WEBrick::Log::INFO),
  :AccessLog => []
)

server.mount '/', MultiPageServlet, root

trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }

puts "\n🚀 KREATIV'PULSE SERVEUR MULTI-PAGES DÉMARRÉ !"
puts "📍 URL Locale : http://localhost:#{port}"
puts "📄 Pages actives : Accueil (/), À Propos (/a-propos), Services (/services), Réalisations (/realisations), Catalogue (/catalogue), Panier (/panier), Contact (/contact)\n\n"

server.start

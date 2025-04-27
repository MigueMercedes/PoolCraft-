export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">PoolCraft</h3>
            <p className="text-gray-400">Configurador Paramétrico de Piscinas</p>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PoolCraft. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

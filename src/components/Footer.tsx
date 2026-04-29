import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tighter">
            Saul<span className="text-blue-500">.dev</span>
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/Saulcoben" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
            <span className="sr-only">GitHub</span>
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

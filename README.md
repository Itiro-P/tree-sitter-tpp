# tree-sitter-tpp

Gramática [tree-sitter](https://tree-sitter.github.io/tree-sitter/) para a linguagem educacional TPP (pseudocódigo em português), com queries de highlight, locals e fold para uso em editores como o Neovim.

## Instalação

### Com lazy.nvim

O parser é instalado através do [`nvim-treesitter`](https://github.com/nvim-treesitter/nvim-treesitter) (branch `main`), usando o plugin de integração [`nvim-tree-sitter-tpp`](https://github.com/Itiro-P/nvim-tree-sitter-tpp) para registrar a linguagem `tpp`, associar a extensão `.tpp` e ativar highlight/fold automaticamente.

Requisitos:

- Neovim 0.12 ou mais recente (nightly)
- [`tree-sitter-cli`](https://github.com/tree-sitter/tree-sitter/blob/master/crates/cli/README.md) instalado no sistema (pelo gerenciador de pacotes do seu SO, não via npm)
- `tar`, `curl` e um compilador C no `PATH`

Spec do lazy.nvim:

```lua
{
  "nvim-treesitter/nvim-treesitter",
  branch = "main",
  lazy = false,
  build = ":TSUpdate",
},
{
  "Itiro-P/nvim-tree-sitter-tpp",
  dependencies = { "nvim-treesitter/nvim-treesitter" },
  opts = {},
},
```

Depois de sincronizar os plugins (`:Lazy sync`), rode uma vez:

```vim
:TSInstall tpp
```

Isso baixa este repositório, compila o parser e instala as queries (`queries/highlights.scm`, `queries/locals.scm`, `queries/folds.scm`) automaticamente. Não precisa de mais nada — o `nvim-tree-sitter-tpp` já ativa parser, highlight e fold sozinho ao abrir um `.tpp`.

> Não precisa rodar `:TSUpdate` antes — `:TSInstall` já dispara sozinho o evento que registra a linguagem `tpp` (é o mesmo evento que o `nvim-tree-sitter-tpp` escuta no seu `setup()`), então funciona mesmo na primeira vez.

> **Atenção:** o `nvim-tree-sitter-tpp` só registra a linguagem e ativa `vim.treesitter.start()` — quem compila o parser e instala as queries é o `nvim-treesitter`. Sem ele instalado (ou sem rodar `:TSInstall tpp`), abrir um arquivo `.tpp` gera o erro `No parser for language "tpp"`.

### Com Neovim puro (sem gerenciador de plugins)

Se você não quiser depender do `nvim-treesitter`, dá pra compilar o parser manualmente e colocá-lo direto no `runtimepath` do Neovim.

Requisitos:

- [Node.js](https://nodejs.org/) (para o CLI do tree-sitter, usado para compilar o parser)
- Um compilador C (gcc/clang)

1. Clone o repositório:

   ```sh
   git clone https://github.com/Itiro-P/tree-sitter-tpp
   cd tree-sitter-tpp
   ```

2. Instale o CLI do tree-sitter (não precisa ser global; `npx` também funciona):

   ```sh
   npm install tree-sitter-cli --no-save
   ```

3. Compile o parser como biblioteca compartilhada:

   ```sh
   npx tree-sitter build -o tpp.so
   ```

4. Copie o `.so` e as queries para o diretório de dados do Neovim (o Neovim só descobre queries automaticamente em `queries/<lang>/*.scm`, então elas precisam ir para uma pasta `tpp`):

   ```sh
   mkdir -p ~/.local/share/nvim/site/parser
   mkdir -p ~/.local/share/nvim/site/queries/tpp
   cp tpp.so ~/.local/share/nvim/site/parser/tpp.so
   cp queries/*.scm ~/.local/share/nvim/site/queries/tpp/
   ```

## Uso

### lazy.nvim

Não precisa configurar nada além da instalação — o `nvim-tree-sitter-tpp` já registra um autocomando de `FileType` que ativa o parser, o highlight e o fold assim que você abre um arquivo `.tpp`.

### Neovim puro

Registre a extensão `.tpp` e ative o parser/fold com um autocomando de `FileType`, em `init.lua`:

```lua
vim.filetype.add({ extension = { tpp = "tpp" } })

vim.api.nvim_create_autocmd("FileType", {
  pattern = "tpp",
  callback = function(args)
    vim.treesitter.start(args.buf, "tpp")
    vim.wo.foldmethod = "expr"
    vim.wo.foldexpr = "v:lua.vim.treesitter.foldexpr()"
  end,
})
```

Ao abrir um arquivo `.tpp`, o Neovim vai aplicar o highlight e o fold definidos em `queries/highlights.scm` e `queries/folds.scm` automaticamente.

-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")

-- neovide settings
if vim.g.neovide then
	vim.o.guifont = "JetBrainsMono NF SemiBold:h9"

	vim.g.neovide_transparency = 0
	vim.g.neovide_background_color = "#191919"

	vim.g.neovide_refresh_rate = 60

	vim.g.neovide_cursor_animation_length = 0.06
end

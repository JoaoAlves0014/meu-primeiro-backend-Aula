const Produto = require('../models/produto');

exports.listarTodos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar produto.' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const [updated] = await Produto.update({ nome, preco }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const produtoAtualizado = await Produto.findByPk(req.params.id);
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const deleted = await Produto.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};
package br.pcjunior.crud.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.pcjunior.crud.exception.ResourceNotFoundException;
import br.pcjunior.crud.model.Produto;
import br.pcjunior.crud.repository.ProdutoRepository;
import br.pcjunior.crud.service.SequenceGeneratorService;

@RestController
@RequestMapping("/api/v1")
public class ProdutoController {
	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	@GetMapping("/produtos")
	public List<Produto> getAllProdutos() {
		return produtoRepository.findAll();
	}

	@GetMapping("/produtos/{codigo}")
	public ResponseEntity<Produto> getProdutoById(@PathVariable(value = "codigo") Long codigoProduto)
			throws ResourceNotFoundException {
		Produto produto = produtoRepository.findById(codigoProduto)
				.orElseThrow(
						() -> new ResourceNotFoundException(
								"Produto com o código '" + codigoProduto + "' não encontrado"));
		return ResponseEntity.ok().body(produto);
	}

	@PostMapping("/produtos")
	public Produto createProduto(@Valid @RequestBody Produto produto) {
		produto.setCodigo(sequenceGeneratorService.generateSequence(Produto.SEQUENCE_NAME));
		return produtoRepository.save(produto);
	}

	@PutMapping("/produtos/{codigo}")
	public ResponseEntity<Produto> updateProduto(@PathVariable(value = "codigo") Long codigoProduto,
			@Valid @RequestBody Produto produtoDetails) throws ResourceNotFoundException {
		Produto produto = produtoRepository.findById(codigoProduto)
				.orElseThrow(
						() -> new ResourceNotFoundException(
								"Produto com o código '" + codigoProduto + "'não foi encontrado"));

		produto.setPreco(produtoDetails.getPreco());
		produto.setNomeProduto(produtoDetails.getNomeProduto());
		final Produto updatedProduto = produtoRepository.save(produto);
		return ResponseEntity.ok(updatedProduto);
	}

	// *********** PAREI AQUI **************
	@DeleteMapping("/produtos/{codigo}")
	public Map<String, Boolean> deleteProduto(@PathVariable(value = "codigo") Long codigoProduto)
			throws ResourceNotFoundException {
		Produto produto = produtoRepository.findById(codigoProduto)
				.orElseThrow(
						() -> new ResourceNotFoundException(
								"Produto com o código '" + codigoProduto + "'não foi encontrado"));

		produtoRepository.delete(produto);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

package br.pcjunior.crud.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Produtos")
public class Produto {

	@Transient
	public static final String SEQUENCE_NAME = "users_sequence";

	@Id
	private long codigo;

	@NotNull
	@Size(max = 100)
	@Indexed(unique = true)
	private String nomeProduto;
	private double preco;

	public Produto() {

	}

	public Produto(String titulo, Double preco) {
		this.nomeProduto = titulo;
		this.preco = preco;
	}

	public long getCodigo() {
		return codigo;
	}

	public void setCodigo(long id) {
		this.codigo = id;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String titulo) {
		this.nomeProduto = titulo;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	@Override
	public String toString() {
		return "Produto [codigo: " + codigo + " - " + nomeProduto + " - preço: " + preco + "]";
	}
}

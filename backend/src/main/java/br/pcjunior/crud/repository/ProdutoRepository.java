package br.pcjunior.crud.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import br.pcjunior.crud.model.Produto;

@Repository
public interface ProdutoRepository extends MongoRepository<Produto, Long> {

}

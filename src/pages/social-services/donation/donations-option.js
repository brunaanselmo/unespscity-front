import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/styled-components/form-button";
import { ContainerBase, ContainerColumn } from "./styles";

const DoacoesOpcoes = () => {
  return (
    <>
      <ContainerBase
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ContainerColumn>
          <Link to="/nova_doacao">
            <Button text="Nova Doação" />
          </Link>
          <Link to="/doacao_lista">
            <Button text="Ver lista de doações" />
          </Link>
          <Link to="/novo_voluntario">
            <Button text="Novo Voluntário" />
          </Link>
        </ContainerColumn>
      </ContainerBase>
    </>
  );
};
export default DoacoesOpcoes;

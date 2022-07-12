import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/styled-components/form-button";
import { ContainerBase, ContainerColumn } from "../components/styles";

const MeioAmbienteOpcoes = () => {
    return (
        <>
            <ContainerBase>
                <ContainerColumn>
                    <Link to = "/admin/adocao_areas_publicas">
                        <Button text = "Adoção de Áreas Públicas" />
                    </Link>
                    <Link to = "/admin/monitoramento">
                        <Button text = "Monitoramento" />
                    </Link>
                </ContainerColumn>
            </ContainerBase>
        </>
    );
};
export default MeioAmbienteOpcoes;
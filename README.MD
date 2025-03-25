# sigma-panel-api

Essa API foi criada com o intuito de ser usada em meus projetos, mas atualmente não a utilizo mais. Decidi deixá-la aqui no GitHub caso seja útil para outras pessoas.

**Atenção:** Use conforme necessário, mas apenas em servidores com canais gratuitos. Respeite as leis de propriedade intelectual.

## Descrição

A `sigma-panel-api` foi desenvolvida para interagir com o painel de revenda de IPTV do Sigma.st, que não fornece uma API oficial. Para contornar essa limitação, utilizei uma técnica para contornar o Cloudflare, permitindo que a API possa ser utilizada para realizar ações como:

- Gerar testes
- Cancelar usuários
- Entre outros recursos

## Como usar

1. **Clone o repositório**:
`git clone https://github.com/seu-usuario/sigma-panel-api.git cd sigma-panel-api`


2. **Instale as dependências**:
Instale as dependências com o comando:
`npm install`

3. **Configure as variáveis de ambiente**:
Configure as variáveis necessárias para o funcionamento da API. (Exemplo: credenciais de acesso, etc).

4. **Execute a API**:
Inicie a API com o comando:
`npm run build`
`npm run start`

## Funcionalidades

- **Testes de Conexão**: Verifique se o painel está respondendo corretamente.
- **Cancelamento de Usuários**: Cancelamento de contas de usuários no painel.
- **Outros**: Dependendo das necessidades do usuário, mais funcionalidades podem ser adicionadas.

## Avisos

- Não é uma API oficial do Sigma.st.
- Use apenas em servidores com canais gratuitos.
- Respeite sempre as leis de propriedade intelectual.

## Contribuições

Sinta-se à vontade para abrir **issues** ou **pull requests** para melhorar este projeto. Se encontrar problemas ou tiver sugestões, me avise.

## Licença

Este projeto está licenciado sob a [Apache 2.0](LICENSE).

---

**Nota**: Este repositório não é afiliado ao Sigma.st e foi feito para fins educacionais. O uso inadequado ou em servidores pagos pode violar os termos de serviço do Sigma.st.

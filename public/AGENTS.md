# AGENTS.md

## Visão geral

Meu projeto será um site pessoal sobre Shingeki no Kyojin, abordando como o anime me marcou, influenciou meus valores e contribuiu para meu crescimento pessoal. O público-alvo são fãs da obra, pessoas interessadas em conhecer novos animes e visitantes que desejam conhecer mais sobre mim. O site busca despertar o interesse por meio de reflexões, experiências pessoais e mensagens transmitidas pela história.

## Tecnologias

Banco de dados que vou utilizar  - MySQL
Para o Back-end, para dados de cadastro, login e Dashboard - Node.JS
API - Web-data-viz
Front-end - HTML, CSS e JAVASCRIPT
Bibliotecas para meu projeto - Chart-js
Git Hub - Repositorio remoto 
Git Bash - terminar de comunicação entre o repositorio local e remoto

## Comandos

npm i - para instalar as dependencias que vou usar no projeto
npm start - para iniciar o programa

## Arquitetura

Diretorio principal front-end e estilização - public
Arquivo principal do front-end - index.html
Criar novos arquivo no diretorio - public 
mudar estilização no arquivo - estilo.css 
O diretorio public se relaciona diretamente com os demais, principalmente com o src, onde esta o NODE.JS, API web-data-viz e back-end do sistema
Os dados que o usuario inserir vão passar por esse fluxo front-end - routes - controller - modell e vai para o banco de dados pela database

## Padrões de desenvolvimento

- Utilizar let por padrão e quando houver necessidade de reatribuição
- Padrão nas nomenclaturas de funções, sempre coloque o nome delas como verbos
- Sempre que você fazer uma input faça o nome dessa variavel com Snake Case (snake_case), seguindo sempre esse padrão
Exemplo: ipt_nome_variavel
- Coloque nomes que façam sentido com a informação daquela variavel

## . Como escrever uma boa descrição

A descrição deve ser **curta, objetiva e específica**.

### Evite

``` text
feat(login): fiz o login
fix(cadastro): arrumei um erro
docs(readme): mudanças
style(tela): deixei mais bonito
```

### Prefira

``` text
feat(login): adiciona validação de e-mail
fix(cadastro): corrige validação de senha
docs(readme): adiciona instruções de execução
style(login): ajusta espaçamento dos campos
```
-padrão de commits baseado neste guia: feat (Nova funcionalidade), fix (Correção de erro), docs (Documentação), style (Estilo e formatação), perf (Melhoria de performance), refactor (Refatoração), test (Testes), chore (Manutenção). Exemplo: feat(login): adiciona validação de e-mail.

## Cuidados e restrições

Nunca altere qualquer coisa relacionada a estrutura do site e a maneira em que estou programando o site, em todas as alterações que você fizer deixe comentarios explicando o que você fez e não faça algo fora do planejado, atenção ao fazer alterações em que eu ja tenha o codígo pronto, não esqueça de seguir o padrão que estabeleci para fazer o codígo.
Os commits das alterações realizadas devem ser feitas em uma branch separada da main, a branch deve ser nomeada de revisao.

## Regra geral: 
Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.

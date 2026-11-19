# Titulo do documento

## 1. Contexto

Atualmente, o projeto Além das Muralhas possui funcionalidades de cadastro, login, dashboard, quiz e avaliação do anime. Entretanto, ainda não existe uma página dedicada para que o usuário visualize suas informações pessoais e suas interações realizadas dentro do site.

Dessa forma, é necessário desenvolver uma página de perfil que centralize os dados cadastrados e as respostas enviadas pelo usuário na avaliação do anime, permitindo que ele consulte suas informações de maneira organizada.

## 2. Objetivo

Desenvolver uma página de perfil integrada à API e ao banco de dados, permitindo que o usuário autenticado visualize suas informações pessoais, sua data de cadastro e as respostas registradas na avaliação do site.

A implementação deverá contemplar tanto o desenvolvimento do backend quanto a integração com o frontend, garantindo que as informações sejam consultadas diretamente no banco de dados e exibidas dinamicamente no HTML.

Para desenvolver essa pagina se baseie na dashboard.html e utilize o dashboards.css

## 3. Escopo

- **Dentro do escopo:** 
Criar uma página HTML dedicada ao perfil do usuário.

Exibir nome de usuário e e-mail.

Exibir o Titã favorito selecionado no cadastro.

Exibir a data em que o usuário realizou seu cadastro.

Consultar e exibir as informações registradas na avaliação do anime:

Aspecto avaliado.

Tema escolhido.

Nota atribuída.

Se o usuário já conhecia o anime.

Desenvolver as rotas necessárias para disponibilizar os dados do perfil pela API.

Desenvolver os controllers responsáveis por receber as requisições e organizar as respostas.

Desenvolver os models responsáveis pelas consultas ao banco de dados.

Integrar o frontend com a API utilizando JavaScript e exibir os dados dinamicamente no HTML.

Tratar situações em que o usuário não possui uma avaliação registrada.

- **Fora do escopo:** 
Exibir quantidade de quizzes realizados, pois essa informação já estará disponível na dashboard principal.

Exibir média de acertos dos quizzes.

Implementar edição de nome, e-mail ou senha.

Implementar alteração do Titã favorito pelo perfil.

Implementar exclusão da conta.

Criar histórico de avaliações ou permitir o envio de uma segunda avaliação pela página de perfil.

## 4. Funcionalidades

## 4.1. Exibição das informações pessoais

Ao acessar a página de perfil, o sistema deverá consultar os dados do usuário autenticado e exibir:

Nome de usuário.

E-mail cadastrado.

Titã favorito.

As informações deverão ser recuperadas diretamente do banco de dados por meio da API.

## 4.2. Exibição da jornada do usuário

O sistema deverá apresentar a data em que o usuário realizou seu cadastro no site.

A informação deverá ser obtida por meio do campo dt_cadastro da tabela usuario.

A data deverá ser apresentada em formato brasileiro (DD/MM/AAAA).

 ## 4.3. Exibição das informações da avaliação

O sistema deverá consultar a avaliação registrada pelo usuário e apresentar as respostas armazenadas na tabela avaliacao.

As informações exibidas deverão ser:

Aspecto: aspecto do anime avaliado pelo usuário.

Tema: tema selecionado durante a avaliação.

Nota: nota atribuída pelo usuário.

Conhecia: resposta referente a se o usuário já conhecia o anime.

Os dados deverão ser relacionados ao usuário autenticado por meio da chave estrangeira correspondente.

## 4.4. Integração com a API

A implementação deverá contemplar todas as camadas necessárias para disponibilizar os dados do perfil:

Routes

Criar a rota responsável por disponibilizar as informações do perfil.

Encaminhar a requisição para o controller correspondente.

Aplicar a autenticação necessária para garantir que somente o usuário autenticado consulte seus próprios dados.

Controllers

Receber a requisição da rota.

Identificar o usuário autenticado.

Solicitar ao model os dados pessoais e as informações da avaliação.

Organizar e retornar os dados em formato JSON.

Tratar erros e situações em que não existam informações de avaliação.

Models

Desenvolver as consultas SQL necessárias para recuperar os dados do usuário.

Consultar as informações da tabela usuario.

Consultar as informações da tabela avaliacao, relacionando-a ao usuário por sua chave estrangeira.

Retornar os resultados para o controller.

Frontend (HTML e JavaScript)

Criar a estrutura HTML da página de perfil.

Consumir a rota disponibilizada pela API utilizando fetch.

Recuperar os dados retornados em JSON.

Preencher os elementos HTML dinamicamente.

Apresentar mensagens adequadas durante o carregamento ou quando não houver uma avaliação cadastrada.

Tratar erros de comunicação com a API.

## 5. Regras de negócio

O perfil deverá apresentar somente as informações do usuário autenticado.

O usuário não poderá consultar os dados pessoais ou a avaliação de outro usuário por meio da alteração de parâmetros da requisição.

As informações deverão ser recuperadas diretamente do banco de dados, sem utilizar dados fictícios ou valores fixos no HTML.

A data de cadastro deverá utilizar o campo dt_cadastro da tabela usuario.

O Titã favorito deverá utilizar o valor registrado no campo tipo_tita da tabela usuario.

A avaliação deverá ser localizada por meio da chave estrangeira do usuário autenticado.

Caso o usuário ainda não tenha realizado a avaliação, o sistema deverá apresentar uma mensagem informando que não existe uma avaliação registrada.

A ausência de uma avaliação não deverá impedir a exibição das demais informações do perfil.

Caso ocorra um erro na comunicação com a API, o sistema deverá apresentar uma mensagem informando que não foi possível carregar os dados.

## 6. Interface
A página deverá seguir a identidade visual já utilizada no projeto Além das Muralhas, mantendo a proposta estética épica e sombria.

## 6.1. Cabeçalho do perfil

Apresentar:

Título "Meu perfil".

Nome de usuário.

E-mail.

Titã favorito.

## 6.2. Informações pessoais

Criar uma seção com cards ou campos informativos para apresentar:

Nome de usuário.

E-mail cadastrado.

Titã favorito.

## 6.3. Minha jornada

Criar uma seção dedicada à trajetória do usuário dentro do site, exibindo a data de cadastro.

Utilizar um ícone de calendário ou outro elemento visual que represente o início da jornada.

## 6.4. Minha avaliação

Criar uma seção para apresentar as respostas enviadas pelo usuário na avaliação do anime.

Organizar as informações em campos separados, com seus respectivos títulos:

Aspecto avaliado.

Tema escolhido.

Nota atribuída.

Já conhecia o anime?

Caso não exista uma avaliação registrada, apresentar uma mensagem informativa no lugar dos dados.

## 6.5. Identidade visual

Manter a paleta de cores já utilizada no projeto.

Utilizar fundos escuros e elementos que remetam à identidade visual de Além das Muralhas.

Manter boa separação visual entre as seções.

Utilizar ícones para facilitar a identificação das informações.

Evitar excesso de elementos e informações desnecessárias.

## 7. Critérios de aceitação

A página de perfil deverá carregar corretamente as informações do usuário autenticado.

O nome de usuário, e-mail e Titã favorito deverão corresponder aos dados armazenados no banco.

A data de cadastro deverá ser apresentada corretamente no formato brasileiro.

As respostas da avaliação deverão corresponder às informações registradas pelo usuário na tabela avaliacao.

O frontend deverá consumir os dados por meio da API, sem utilizar informações fixas.

As rotas, controllers e models deverão estar implementados e integrados corretamente.

O sistema deverá impedir que um usuário consulte informações pertencentes a outra conta.

Caso não exista uma avaliação registrada, as demais informações do perfil deverão continuar sendo exibidas normalmente.

A interface deverá seguir a identidade visual do projeto e apresentar as informações de maneira organizada.

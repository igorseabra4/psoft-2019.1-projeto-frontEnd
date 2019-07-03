UCDb: classificações e reviews de cursos da UFCG


Front-end do projeto da disciplina Projeto de Software UFCG		2019.1.


Alunos:
* Igor Santa Ritta Seabra
* Victor Paz de Farias Braga


O front-end é basicamente uma interface de acesso à API REST do back-end. Ela possui a página de login, que permite entrar com um usuário e senha previamente cadastrados, a página de criação de usuário, a página de disciplinas que permite ver a lista de todas as disciplinas assim como pesquisar por uma parte do nome e exibir a lista de acordo com a classificação das disciplinas, e a página do perfil da disciplina, que permite ao usuário autenticado ver as informações de uma disciplina, dar ou retirar uma curtida, dar sua nota à disciplina, ver e fazer comentários para aquela disciplina.


As páginas foram escritas em HTML, com estilização em CSS e scripts em JavaScript para requerimentos HTTP à API. Arquivos presentes no repositório:


Arquivo | Descrição
--- | ---
/cadastro.html|paǵina de cadastro de usuário
/disciplinas.html|página da lista, pesquisa e ranking de disciplinas
/index.php|arquivo php usado para facilitar o deployment no heroku
/index.html|paǵina principal (login)
/perfil.html|página do perfil de uma disciplina
/README.md|este arquivo
/css/style.css|estilos usados de forma compartilhada pelos elementos nas páginas do site
/css/disciplinas.css|estilos usados na tabela de disciplinas
/css/perfil.css|estilos usados na página do perfil de uma disciplina
/img/logo-topo2.png|logotipo da UFCG usado nas páginas do site
/js/cadastro.js|arquivo JavaScript para a página de cadastro
/js/disciplinas.js|arquivo JavaScript para a página da lista de disciplinas
/js/header.js|arquivo JavaScript usado pelo cabeçalho do site, com o nome do usuário atual e botão de logout
/js/index.js|arquivo JavaScript usado na página principal (login)
/js/perfil.js|arquivo JavaScript usado para o perfil de uma disciplina

Repositório do front-end no GitHub: https://github.com/igorseabra4/psoft-2019.1-projeto-frontEnd

Repositório do back-end no GitHub: https://github.com/igorseabra4/psoft-2019.1-projeto-backEnd


Link para o deployment da aplicação (front-end) no Heroku: https://psoft-igor-victor-front.herokuapp.com/

Link para o deployment do back-end no Heroku: https://projeto-psoft-igor-victor.herokuapp.com/


O back-end permite requisições HTTP de qualquer cliente, desde que sejam conhecidas as rotas e os métodos permitidos para cada uma.

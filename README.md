# Nodetemplater
O Nodetemplater é uma ferramenta de linha de comando (CLI) para criar estruturas de pastas e arquivos baseados em design patterns para aplicações Node.js.

## Instalação
Para utilizar o Nodetemplater, é necessário ter o Node.js instalado. Em seguida, execute o seguinte comando:

```
npm install -g nodetemplater
```
Isso instalará o Nodetemplater globalmente em sua máquina, permitindo que você o utilize em qualquer diretório.

## Utilização
Para utilizar o Nodetemplater, use o comando generate seguido do tipo de estrutura desejada. Por exemplo, para gerar a estrutura MVC, você pode fazer da seguinte maneira:

```
nodetemplater generate mvc
```
Você também pode utilizar a opção -f ou --force para criar a estrutura sem a necessidade de confirmar cada passo:

```
nodetemplater generate mvc -f
```
Isso criará a estrutura MVC diretamente, sem a necessidade de interação do usuário.

## Design Patterns Disponíveis
Atualmente, o Nodetemplater oferece suporte aos seguintes design patterns para a criação de estrutura:

- MVC
- MVP
- MVVM
- Repository
Entre outros padrões...

## Contribuindo
Se você deseja contribuir com o Nodetemplater, sinta-se à vontade para abrir uma issue ou enviar um pull request no repositório GitHub. Estamos abertos a sugestões, correções e melhorias.

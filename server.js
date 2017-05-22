const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

console.log('Initializing scrapping...')

const url = 'https://www.zapimoveis.com.br/venda/imoveis/rj+rio-de-janeiro?p%C3%A1gina='

let page = 1
let stopCondition = 10

const fileName = 'zapimoveis.json'

let collection = []

function retornaImovel(rua, bairro, cidade, preco, quartos, vagas, suites, metragem, condominio, iptu, link) {
  return { rua, bairro, cidade, preco, quartos, vagas, suites, metragem, condominio, iptu, link }
}

function callback(error, response, html) {
  console.log('Page: ' + page)
  console.log('Stop condition: ' + stopCondition)
  console.log('Percentage of scrapping: ' + ((page / stopCondition) * 100).toFixed(2) + '%') 
  
  
  page++

  if (error || (page > stopCondition)) {
    if (error) console.warn(error)
    fs.writeFileSync(fileName, JSON.stringify(collection, null, 2))
    console.log('Scrapping finished.')
    return
  }

  let $ = cheerio.load(html)


  if (page % 10 === 0) {
    fs.writeFileSync(fileName, JSON.stringify(collection, null, 2))
  }
  
  request(url + page, callback)
}

request(url + page, callback)

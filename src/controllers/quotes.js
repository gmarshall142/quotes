const QuoteSchema = require('../models/Quote.js');

module.exports.controller = (app) => {
  // fetch all movies
  app.get('/quotes', (req, res) => {
    QuoteSchema.find({}, (error, quotes) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
      // res.send({quotes});
      const returnQuotes = [];
      quotes.forEach((element) => {
        const newQuote = element.toJSON();
        newQuote.links = {};
        const quoteId = newQuote._id.toJSON();
        newQuote.links.self = `http://${req.headers.host}/quotes/${quoteId}`;
        returnQuotes.push(newQuote);
      });
      res.json({ quotes: returnQuotes });
    });
  });

  // add a new quote
  app.post('/quotes', (req, res) => {
    if (!req.body.quote_string) {
      res.status(400);
      res.send('Quote is required');
    } else {
      const newQuote = new QuoteSchema({
        version: req.body.version,
        author_first_name: req.body.author_first_name,
        author_last_name: req.body.author_last_name,
        category: req.body.category,
        comment: req.body.comment,
        graphic_url: req.body.graphic_url,
        quote_format: req.body.quote_format,
        quote_string: req.body.quote_string,
        source: req.body.source,
      });
      newQuote.save((error, quote) => {
        if (error) { console.log(error); }
        res.send(quote);
      });
    }
  });

  // update a new quote
  app.put('/quotes/:quoteId', (req, res) => {
    if (!req.body.quote_string) {
      res.status(400);
      res.send('Quote is required');
    } else {
      console.log('put');
      const newQuote = new QuoteSchema({
        _id: req.params.quoteId,
        version: req.body.version,
        author_first_name: req.body.author_first_name,
        author_last_name: req.body.author_last_name,
        category: req.body.category,
        comment: req.body.comment,
        graphic_url: req.body.graphic_url,
        quote_format: req.body.quote_format,
        quote_string: req.body.quote_string,
        source: req.body.source,
      });
      newQuote.isNew = false;

      newQuote.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(newQuote);
        }
      });
    }
  });
};

// ========== INSTRUCTIONS ==================
// Welcome to Forma.ai stock statement generator! In this problem, you will be coding up a transaction
// statement generator for a existing trader on our stock trading system. The inputs are provided below, and
// the exact output you are to generate is provided after the inputs.

// actions: the timestamped actions that the stock trader performed, it can be BUY or SELL type, and they can
// buy or sell a few different stocks. However, you should assume that the number of ticker is not limited to
// 3 types as in the example below, but potentially infinite, so the ticker should not be hardcoded anywhere.

// stock_actions: the timestamped actions that the stock performed regardless of who the trader is. It includes
// stock splits, and dividend payouts. Even though these actions are not performed by our trader, it still affects
// our trader's portfolios, so it should be recorded in the statement that we prepare.

// We are looking for easy to understand/extend program that doesn't perform any unnecessary actions.

// Feel free to extend the test cases to include new ones that exercises your program to the fullest.
// '''

// # input

// actions = [{'date': '1992/07/14 11:12:30', 'action': 'BUY', 'price': '12.3', 'ticker': 'AAPL', 'shares': '500'}, {'date': '1992/09/13 11:15:20', 'action': 'SELL', 'price': '15.3', 'ticker': 'AAPL', 'shares': '100'}, {'date': '1992/10/14 15:14:20', 'action': 'BUY', 'price': '20', 'ticker': 'MSFT', 'shares': '300'}, {'date': '1992/10/17 16:14:30', 'action': 'SELL', 'price': '20.2', 'ticker': 'MSFT', 'shares': '200'}, {'date': '1992/10/19 15:14:20', 'action': 'BUY', 'price': '21', 'ticker': 'MSFT', 'shares': '500'}, {'date': '1992/10/23 16:14:30', 'action': 'SELL', 'price': '18.2', 'ticker': 'MSFT', 'shares': '600'}, {'date': '1992/10/25 10:15:20', 'action': 'SELL', 'price': '20.3', 'ticker': 'AAPL', 'shares': '300'}, {'date': '1992/10/25 16:12:10', 'action': 'BUY', 'price': '18.3', 'ticker': 'MSFT', 'shares': '500'}]
// stock_actions = [{'date': '1992/08/14', 'dividend': '0.10', 'split': '', 'stock': 'AAPL'}, {'date': '1992/09/01', 'dividend': '', 'split': '3', 'stock': 'AAPL'}, {'date': '1992/10/15', 'dividend': '0.20', 'split': '', 'stock': 'MSFT'},{'date': '1992/10/16', 'dividend': '0.20', 'split': '', 'stock': 'ABC'}]

// # output:

// """
// On 1992-07-14, you have:
//     - 500 shares of AAPL at $12.30 per share
//     - $0 of dividend income
//   Transactions:
//     - You bought 500 shares of AAPL at a price of $12.30 per share
// On 1992-08-14, you have:
//     - 500 shares of AAPL at $12.30 per share
//     - $50.00 of dividend income
//   Transactions:
//     - AAPL paid out $0.10 dividend per share, and you have 500 shares
// On 1992-09-01, you have:
//     - 1500 shares of AAPL at $4.10 per share
//     - $50.00 of dividend income
//   Transactions:
//     - AAPL split 3 to 1, and you have 1500 shares
// On 1992-09-13, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - $50.00 of dividend income
//   Transactions:
//     - You sold 100 shares of AAPL at a price of $15.30 per share for a profit of $1120.00
// On 1992-10-14, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - 300 shares of MSFT at $20.00 per share
//     - $50.00 of dividend income
//   Transactions:
//     - You bought 300 shares of MSFT at a price of $20.00 per share
// On 1992-10-15, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - 300 shares of MSFT at $20.00 per share
//     - $110.00 of dividend income
//   Transactions:
//     - MSFT paid out $0.20 dividend per share, and you have 300 shares
// On 1992-10-17, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - 100 shares of MSFT at $20.00 per share
//     - $110.00 of dividend income
//   Transactions:
//     - You sold 200 shares of MSFT at a price of $20.20 per share for a profit of $40.00
// On 1992-10-19, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - 600 shares of MSFT at $20.83 per share
//     - $110.00 of dividend income
//   Transactions:
//     - You bought 500 shares of MSFT at a price of $21.00 per share
// On 1992-10-23, you have:
//     - 1400 shares of AAPL at $4.10 per share
//     - $110.00 of dividend income
//   Transactions:
//     - You sold 600 shares of MSFT at a price of $18.20 per share for a loss of $-1580.00
// On 1992-10-25, you have:
//     - 1100 shares of AAPL at $4.10 per share
//     - 500 shares of MSFT at $18.30 per share
//     - $110.00 of dividend income
//   Transactions:
//     - You sold 300 shares of AAPL at a price of $20.30 per share for a profit of $4860.00
//     - You bought 500 shares of MSFT at a price of $18.30 per share

const moment = require('moment');

actions = [{
  'date': '1992/07/14 11:12:30',
  'action': 'BUY',
  'price': '12.3',
  'ticker': 'AAPL',
  'shares': '500'
}, {
  'date': '1992/09/13 11:15:20',
  'action': 'SELL',
  'price': '15.3',
  'ticker': 'AAPL',
  'shares': '100'
}, {
  'date': '1992/10/14 15:14:20',
  'action': 'BUY',
  'price': '20',
  'ticker': 'MSFT',
  'shares': '300'
}, {
  'date': '1992/10/17 16:14:30',
  'action': 'SELL',
  'price': '20.2',
  'ticker': 'MSFT',
  'shares': '200'
}, {
  'date': '1992/10/19 15:14:20',
  'action': 'BUY',
  'price': '21',
  'ticker': 'MSFT',
  'shares': '500'
}, {
  'date': '1992/10/23 16:14:30',
  'action': 'SELL',
  'price': '18.2',
  'ticker': 'MSFT',
  'shares': '600'
}, {
  'date': '1992/10/25 10:15:20',
  'action': 'SELL',
  'price': '20.3',
  'ticker': 'AAPL',
  'shares': '300'
}, {
  'date': '1992/10/25 16:12:10',
  'action': 'BUY',
  'price': '18.3',
  'ticker': 'MSFT',
  'shares': '500'
}]
stock_actions = [{
  'date': '1992/08/14',
  'dividend': '0.10',
  'split': '',
  'stock': 'AAPL'
}, {
  'date': '1992/09/01',
  'dividend': '',
  'split': '3',
  'stock': 'AAPL'
}, {
  'date': '1992/10/15',
  'dividend': '0.20',
  'split': '',
  'stock': 'MSFT'
}, {
  'date': '1992/10/16',
  'dividend': '0.20',
  'split': '',
  'stock': 'ABC'
}]

let holdings = new Object;
let statement = new Object;
let prevDate = moment('1900/01/01', 'YYYY-MM-DD').format('YYYY-MM-DD');
let nextDate = moment('9999/12/31', 'YYYY-MM-DD').format('YYYY-MM-DD');
let prevStock = '';

function createStatement(tranDate) {
  if (tranDate !== prevDate) {
    statement[tranDate]['title'] = `On ${tranDate}, you have:`;
  }
  let cumulativeDiv = 0;
  Object.keys(holdings).forEach(stock => {
    let {
      Shares,
      AvgPrice,
      Dividend
    } = holdings[stock];
    cumulativeDiv += Dividend;

    // Only print if Shares are greater than 0
    if (Shares > 0) {
      let sentence = `    - ${Shares} of ${stock} at $${AvgPrice.toFixed(2)} per share`;

      if ((tranDate !== prevDate || stock !== prevStock)) {
        statement[tranDate]['holdings'].push(sentence);
      } 
      
    }
  })
  if (tranDate !== nextDate) {
    statement[tranDate]['holdings'].push(`    - $${cumulativeDiv} of dividend income`)
  }
}


function createTransactions(transaction) {
  let momentDate = moment(transaction.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  let price = Number(transaction.price);
  if (transaction.action) {
    switch (transaction.action) {
      case 'BUY':
        let sentence = `    - You bought ${transaction.shares} shares of ${transaction.ticker} at a price of $${price.toFixed(2)} per share`;

        statement[momentDate]['transactions'].push(`    - You bought ${transaction.shares} shares of ${transaction.ticker} at a price of $${price.toFixed(2)} per share`);
        // }
        break;
      case 'SELL':
        let profit = ((transaction.shares * transaction.price) - (transaction.shares * holdings[transaction.ticker]['AvgPrice'])).toFixed(2);
        if (profit > 0) {
          statement[momentDate]['transactions'].push(`    - You sold ${transaction.shares} shares of ${transaction.ticker} at a price of $${price.toFixed(2)} per share for a profit of $${profit}`);
        } else {
          statement[momentDate]['transactions'].push(`    - You sold ${transaction.shares} shares of ${transaction.ticker} at a price of $${price.toFixed(2)} per share for a loss of $${profit}`);
        }
        break;
      default:
        break;
    }
  } else if (transaction.dividend && holdings[transaction.stock]) {
    statement[momentDate]['transactions'].push(`    - ${transaction.stock} paid out $${transaction.dividend} dividend per share, and you have ${holdings[transaction.stock]['Shares']} shares`);
  } else if (transaction.split) {
    statement[momentDate]['transactions'].push(`    - ${transaction.stock} split ${transaction.split} to 1, and you have ${holdings[transaction.stock]['Shares']} shares`);
  }
}


function buy(ticker, shares, price) {
  // If Ticker exists updates shares and avg. price
  if (holdings[ticker]) {
    holdings[ticker]['AvgPrice'] = (((holdings[ticker]['AvgPrice'] * holdings[ticker]['Shares']) + (shares * price)) / (holdings[ticker]['Shares'] + shares));
    holdings[ticker]['Shares'] += shares;
  } else {
    holdings[ticker] = new Object;
    holdings[ticker]['Shares'] = shares;
    holdings[ticker]['AvgPrice'] = price;
    holdings[ticker]['Dividend'] = 0;
  }
}

function sell(ticker, shares, price) {
  // If ticker exists updates shares and avg price
  if (holdings[ticker]) {
    holdings[ticker]['Shares'] -= shares;
  } else {
    console.log('Error: Stock not found')
  }
}

function dividends(stock, dividend) {
  // If ticker exists updates the dividends for that stock
  if (holdings[stock]) {
    holdings[stock]['Dividend'] += (holdings[stock]['Shares'] * dividend)
  } else {
    // Do nothing
  }
}

function splits(stock, split) {
  // If ticker exists updates the shares number and avg price
  if (holdings[stock]) {
    holdings[stock]['AvgPrice'] = Number((holdings[stock]['AvgPrice'] / split).toFixed(2));
    holdings[stock]['Shares'] *= split;
  } else {
    console.log('Error: Stock not found')
  }
}

function printStatement () {
  Object.keys(statement).forEach(tranDate => {
    console.log(statement[tranDate].title)
    statement[tranDate].holdings.forEach(holding => {
      console.log(holding)
    })
    console.log('Transactions:')
    statement[tranDate].transactions.forEach(transaction => {
      console.log(transaction)
    })
  });
}

function main() {
  const mergeArrays = (arr1, arr2) => {
    return arr1.concat(arr2).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  const sortedTransactions = mergeArrays(actions, stock_actions);

  sortedTransactions.forEach((transaction, index) => {
    let {
      ticker,
      price,
      shares,
      dividend,
      split,
      stock
    } = transaction;
    
    if (sortedTransactions[index + 1]) {
      currentDate = moment(transaction.date, 'YYYY-MM-DD').format('YYYY-MM-DD')
      nextDate = moment(sortedTransactions[index + 1].date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    } else {
      nextDate = undefined;
    }

    // Executes all the transactions
    if (transaction.action === 'BUY') {
      buy(ticker, Number(shares), Number(price));
    } else if (transaction.action === 'SELL') {
      sell(ticker, Number(shares), Number(price));
    } else if (transaction.dividend) {
      dividends(stock, Number(dividend));
    } else if (transaction.split) {
      splits(stock, Number(split));
    }

    // Print the statement output
    let tranDate = moment(transaction.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    statement[tranDate] ? '' : statement[tranDate] = new Object;
    statement[tranDate]['holdings'] ? '' : statement[tranDate]['holdings'] = new Array;
    statement[tranDate]['transactions'] ? '' : statement[tranDate]['transactions'] = new Array;

    createStatement(tranDate);
    createTransactions(transaction);
    prevDate = moment(transaction.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    prevStock = ticker;
  });
  printStatement()
}

main();

import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SortType = {
  BY_LENGTH: 'length',
  ALPHABETICALLY: 'alphabetically',
};

// type Good = {
//   good: string;
// };

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(true);

  function prepareGoods(goods, sortBy, order = true) {
    const preparedGoods = [...goods];

    if (sortBy) {
      switch (sortBy) {
        case SortType.BY_LENGTH: {
          preparedGoods.sort((goodA, goodB) =>
            order === true
              ? goodA.length - goodB.length
              : goodB.length - goodA.length,
          );
          break;
        }

        case SortType.ALPHABETICALLY: {
          preparedGoods.sort((goodA, goodB) =>
            order === true
              ? goodA.localeCompare(goodB)
              : goodB.localeCompare(goodA),
          );
          break;
        }

        default:
          return preparedGoods;
      }
    }

    if (!order) {
      return preparedGoods.reverse();
    }

    return preparedGoods;
  }

  const visibleGoods = prepareGoods(goodsFromServer, sortField, sortOrder);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort {SortType.ALPHABETICALLY}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by {SortType.BY_LENGTH}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': sortOrder !== false,
          })}
          onClick={() => {
            setSortOrder(prevOrder => !prevOrder);
          }}
        >
          Reverse
        </button>
        {(sortField !== '' || !sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortOrder(1);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods &&
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};

import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { notAny } from "../optimized";
import {
  getFirstMonth,
  isStartingBalanceOrReconciliation,
  isTransfer,
  isIncome,
  getTransactionMonth
} from "../budgetUtils";
import pages, { makeLink } from "../pages";
import MonthByMonthSection from "./MonthByMonthSection";
import GenericEntitiesSection from "./GenericEntitiesSection";

class Groups extends PureComponent {
  static propTypes = {
    budget: PropTypes.object.isRequired,
    investmentAccounts: PropTypes.object.isRequired,
    onSelectMonth: PropTypes.func.isRequired,
    selectedMonth: PropTypes.string
  };

  state = { selectedGroupId: null };

  handleClickEntity = groupId => {
    this.setState(state => ({
      ...state,
      selectedGroupId: groupId === state.selectedGroupId ? null : groupId
    }));
  };

  render() {
    const {
      budget,
      investmentAccounts,
      selectedMonth,
      onSelectMonth
    } = this.props;
    const { selectedGroupId } = this.state;
    const {
      transactions,
      categoryGroupsById,
      categoriesById,
      id: budgetId
    } = budget;
    const firstMonth = getFirstMonth(budget);
    const filteredTransactions = transactions.filter(
      notAny([
        isStartingBalanceOrReconciliation(budget),
        isTransfer(investmentAccounts),
        isIncome(budget)
      ])
    );

    const transactionsForMonth =
      selectedMonth &&
      filteredTransactions.filter(
        transaction => getTransactionMonth(transaction) === selectedMonth
      );

    return (
      <Fragment>
        <MonthByMonthSection
          firstMonth={firstMonth}
          selectedMonth={selectedMonth}
          highlightFunction={
            selectedGroupId &&
            (transaction =>
              categoriesById[transaction.category_id].category_group_id ===
              selectedGroupId)
          }
          transactions={filteredTransactions}
          onSelectMonth={onSelectMonth}
        />
        <GenericEntitiesSection
          entityFunction={transaction =>
            categoriesById[transaction.category_id].category_group_id
          }
          entitiesById={categoryGroupsById}
          linkFunction={categoryGroupId =>
            makeLink(pages.group.path, { budgetId, categoryGroupId })
          }
          showTransactionCount={false}
          selectedEntityId={selectedGroupId}
          title="Category Groups"
          transactions={transactionsForMonth || filteredTransactions}
          onClickEntity={this.handleClickEntity}
        />
      </Fragment>
    );
  }
}

export default Groups;

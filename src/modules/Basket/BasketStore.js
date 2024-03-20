import { observable, makeObservable, action, computed } from "mobx";

class BasketStore {
  @observable orders = [];
  constructor() {
    makeObservable(this);
  }

  @action setOrders(actionType, pizzaItem) {
    switch (actionType) {
      case "add":
        const index = this.orders.findIndex((item) => item.id === pizzaItem.id);
        if (index < 0) {
          const newItem = { ...pizzaItem, amount: 1 };
          this.orders = [...this.orders, newItem];
        } else {
          const newItem = { ...this.orders[index] };
          newItem.amount = ++this.orders[index].amount;
          this.orders[index] = newItem;
        }
        break;
      case "delete":
        const filteredItems = this.orders.filter((el) => el.id != pizzaItem.id);
        this.orders = filteredItems;
        break;
      default:
        break;
    }
  }

  @action resetOrders() {
    this.orders = [];
  }

  @computed get getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.orders) {
      totalPrice += item.price * item.amount;
    }
    return totalPrice;
  }
}

const basketStore = new BasketStore();

export default basketStore;

import Bool "mo:base/Bool";
import List "mo:base/List";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor ShoppingList {
  public type Item = {
    id: Nat;
    text: Text;
    completed: Bool;
  };

  stable var items : [Item] = [];
  stable var nextId : Nat = 0;

  public func addItem(text: Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : Item = {
      id = id;
      text = text;
      completed = false;
    };
    items := Array.append(items, [newItem]);
    id
  };

  public query func getItems() : async [Item] {
    items
  };

  public func updateItem(id: Nat, completed: Bool) : async Bool {
    items := Array.map<Item, Item>(items, func (item) {
      if (item.id == id) {
        {
          id = item.id;
          text = item.text;
          completed = completed;
        }
      } else {
        item
      }
    });
    true
  };

  public func deleteItem(id: Nat) : async Bool {
    let newItems = Array.filter<Item>(items, func (item) { item.id != id });
    if (newItems.size() < items.size()) {
      items := newItems;
      true
    } else {
      false
    }
  };
}

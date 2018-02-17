---
id: guide-observe

title: Observing changes in the UI
---

GraphStore objects are just MobX observables.  So in a React `@obseserver render()` method or in a console application `autorun` they just stay up to date.   They also contain a useful `loading` property.  

## Usage: Autorun or MobX reactions, can be used anywhere

```js
autorun(() => { 
    console.log(
        (!(user.loading || users.userPosts.loading)) ? 
             `${user.name} has ${posts.length} posts` 
               : 'loading from database' )
      });
```

## Usage: Render (React)

The following class will automatically subscribe to the database starting with the first render, and will automatically release the subscription when the component is no longer in scope.  The render() will be recalled whenever any of the data changes (from the database or from other views).

```jsx
@observer
class UserView extends Component {

  constructor(props) {
    super(props);
    this.state =  { user: User = stores.UserStore.getbyId(props.userId)};
  }
  
  render() {
        return (user.loading) ? <div>Loading<div> : 
        <div>
        Hello this.state.user.username;
        </div>
    }
}
```

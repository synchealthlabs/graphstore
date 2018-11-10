import React, { useState, useEffect, useMemo } from 'react'
import { observable, Reaction } from 'mobx'

export type IReactComponent<P = any> = React.StatelessComponent<P>

export function observer<T extends IReactComponent>(baseComponent: T): T {
  // memo; we are not intested in deep updates
  // in props; we assume that if deep objects are changed,
  // this is in observables, which would have been tracked anyway
  return (props => {
    // forceUpdate 2.0
    const forceUpdate = useForceUpdate()

    // create a Reaction once, and memoize it
    const reaction = useMemo(
      () =>
        // If the Reaction detects a change in dependency,
        // force a new render
        new Reaction(
          `observer(${baseComponent.displayName || baseComponent.name})`,
          forceUpdate
        ),
      []
    )

    // clean up the reaction if this component is unMount
    useUnmount(() => reaction.dispose())

    // render the original component, but have the
    // reaction track the observables, so that rendering
    // can be invalidated (see above) once a dependency changes
    let rendering
    reaction.track(() => {
      rendering = baseComponent(props)
    })
    return rendering
  }) as any
}

export function useObservable(initialValue) {
  return useState(observable(initialValue))[0]
}

function useForceUpdate() {
  const [tick, setTick] = useState(1)
  return () => {
    setTick(tick + 1)
  }
}

function useUnmount(fn) {
  useEffect(() => fn, [])
}

export const Observer = observer(({ children, render }) => {
  const component = children || render

  if (typeof component === 'undefined') {
    return null
  }

  return component()
})

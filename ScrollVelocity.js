import React from 'react'
import { PureComponent } from 'react'

class ScrollVelocity extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.state = {
      lastScrollTop: 0,
      lastScrollLeft: 0,
      velocityY: 0.0,
      velocityX: 0.0,
      lastUpdatedAt: null
    }

    this._onScroll = this._onScroll.bind(this)
  }

  render () {
    const { children } = this.props
    const { velocityX, velocityY } = this.state

    return children({ velocityX, velocityY, onScroll: this._onScroll })
  }

  _onScroll ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }) {
    const now = Date.now()
    const deltaT = (now - this.state.lastUpdatedAt)
    const deltaY = scrollTop - this.state.lastScrollTop
    const deltaX = scrollLeft - this.state.lastScrollLeft
    const velocityX = Math.round(deltaX / deltaT)
    const velocityY = Math.round(deltaY / deltaT)
    const isScrolling = velocityY > 0 && velocityX > 0

    this.setState({
      velocityX, velocityY,
      lastScrollTop: scrollTop,
      lastScrollLeft: scrollLeft,
      lastUpdatedAt: now
    })
  }
}

ScrollVelocity.propTypes = {
  children: React.PropTypes.func.isRequired
}

export default ScrollVelocity

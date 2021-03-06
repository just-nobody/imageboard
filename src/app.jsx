// @flow
import {h} from 'hyperapp'
import {onlyOnSelf, preventDefault} from './util'
import './styles.styl'

/**
 * Model
 */
type ImageOverlay = {
  open: boolean,
  image: string,
}

type Model = {
  images: string[],
  imageOverlay: ImageOverlay,
}

export const model: Model = {
  images: [
    require('./images/test1.png'),
    require('./images/test2.png'),
    require('./images/test3.jpg'),
    require('./images/test4.png')
  ],
  imageOverlay: {
    open: false,
    image: ''
  }
}

/**
 * Actions
 */
type Actions = {
  handleImageClicked(image: string): void,
  handleOverlayClosed(): void
}

export const actions = {
  handleImageClicked (model: Model, image: string) {
    return {
      imageOverlay: {
        open: true,
        image
      }
    }
  },

  handleOverlayClosed (model: Model) {
    return {
      imageOverlay: {
        open: false,
        image: model.imageOverlay.image
      }
    }
  }
}

/**
 * View
 */
export function view (model: Model, actions: Actions) {
  return (
    <main>
      <ImageList images={model.images} onimageclick={actions.handleImageClicked} />
      <Overlay open={model.imageOverlay.open} onclose={actions.handleOverlayClosed}>
        <img src={model.imageOverlay.image} style={{ display: 'block', width: '100%' }} />
      </Overlay>
    </main>
  )
}

function ImageList (props: { images: string[], onimageclick: (image: string) => any }) {
  const imageElements = props.images.map(image =>
    <a href='#' class='image-thumb'
      style={{ backgroundImage: `url(${image})` }}
      onpointerdown={preventDefault(() => props.onimageclick(image))}
    />
  )

  return <div class='image-list'>{imageElements}</div>
}

function Overlay (props: { open: boolean, onclose: () => any }, children) {
  const overlayClass = 'overlay-shade ' + (props.open ? 'overlay-shade--visible' : '')
  return (
    <div class={overlayClass} onpointerdown={preventDefault(onlyOnSelf(props.onclose))}>
      <div class='overlay-content'>
        {children}
      </div>
    </div>
  )
}

export default {
  methods: {
    getColor (color) {
      if (color === null) return 'grey-10'

      var r, g, b, hsp
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

      r = color >> 16
      g = color >> 8 & 255
      b = color & 255

      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      )

      // Using the HSP value, determine whether the color is light or dark
      if (hsp > 127.5) {
        // means color is light, so return dark text color
        return 'grey-10'
      } else {
        // means color is dark, so return light text color
        return 'white'
      }
    },
    emptyListText (projectsType) {
      switch (projectsType) {
        case 'active': return 'No project available'
        case 'archive': return 'Nothing archived yet'
        case 'completed': return 'No completed project'
        default : return 'List Empty'
      }
    }
  }
}

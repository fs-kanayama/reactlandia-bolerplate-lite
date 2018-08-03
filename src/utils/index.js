export const pages = [
  'Home',
  'About',
  'Thing',
]

export const nextIndex = index => ++index % pages.length

export const indexFromPath = path => {
  path = path === '/' ? '/Home' : path
  return pages.indexOf(path.substr(1))
}

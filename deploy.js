import ghpages from 'gh-pages'
import path from 'path'

ghpages.publish(path.join(__dirname, 'dist'), function (err) {
  console.log('An error occured when publishing to github pages')
  console.error(err)
})

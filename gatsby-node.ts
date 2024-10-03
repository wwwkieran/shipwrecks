import type { GatsbyNode } from "gatsby"

const path = require('path')
const shipTemplate = path.resolve('./src/pages/ship.tsx')


export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
    const { data } = await graphql(`
    query shipData {
      allDataCsv {
        nodes {
            id
        }
      }
    }
  `)
    // @ts-ignore
    data.allDataCsv.nodes.forEach((node, index) => {
        actions.createPage({
            path: 'ships/' + node.frontmatter.slug,
            component: `${shipTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id,
            }
        })
    })
}

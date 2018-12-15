import { ApplicationDependencies } from '../types/app'

export function createDependencyMap(initialDependencies?: ApplicationDependencies) {
  const dependencies: ApplicationDependencies = initialDependencies || {}

  return {
    getDependencies: () => dependencies,
    getDependency: (name: string):any => dependencies[name],
    injectDependency: (name: string, dependency: any) => { 
      dependencies[name] = dependency
      return dependencies;
    }
  }
}
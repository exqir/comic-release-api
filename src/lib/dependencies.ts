import { ApplicationDependencies, DependencyInjector } from '../types/app'

export function createDependencyMap(
  initialDependencies: ApplicationDependencies,
): DependencyInjector {
  const dependencies: ApplicationDependencies = initialDependencies

  return {
    getDependencies: () => dependencies,
    getDependency: (name) => dependencies[name],
    injectDependency: (name, dependency) => {
      dependencies[name] = dependency
      return dependencies
    },
  }
}

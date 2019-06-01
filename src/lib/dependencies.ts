import { ApplicationDependencies, DependencyInjector } from '../types/app'

export function createDependencyMap(
  initialDependencies: ApplicationDependencies,
): DependencyInjector {
  const dependencies: ApplicationDependencies = initialDependencies

  return {
    getDependencies: () => dependencies,
    getDependency: (name: string): any => dependencies[name],
    injectDependency: (name: string, dependency: any): any => {
      dependencies[name] = dependency
      return dependencies
    },
  }
}

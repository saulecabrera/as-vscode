import * as vscode from 'vscode';

const ID = "asls";
const NAME = "AssemblyScript Language Server";

export interface Config {
  id: string,
  name: string,
  port: number,
  include: string[],
  debug: boolean,
};

/**
 * Returns a configuration object from the VSCode configuration entry
 *
 * @returns Config
 *
 */

export const fromEntry = (): Config => {
  const conf = vscode.workspace.getConfiguration(ID);
  return {
    id: ID,
    name: NAME,
    port: (conf.get('port') as number),
    include: (conf.get('include') as string[]),
    debug: (conf.get('debug') as boolean),
  };
};

/**
 *
 * Converts the configuration into an
 * array of command line arguments
 *
 * @param cfg - The configuration object
 * @returns string[]
 */
export const toArgs = (cfg: Config) => {

  if (cfg.debug) {
    return ['eval', `"AssemblyScriptLS.CLI.start_with_options([port: ${cfg.port}, debug: true])"`];
  }

  return ['eval', `"AssemblyScriptLS.CLI.start_with_options([port: ${cfg.port}])"`];
};

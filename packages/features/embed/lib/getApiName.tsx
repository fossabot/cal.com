export function getApiName({
  namespace,
  mainApiName = "Cal",
}: {
  namespace: string | null;
  mainApiName?: string;
}) {
  if (!namespace) {
    return mainApiName;
  }
  const isAValidVariableName = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(namespace);
  return isAValidVariableName ? `${mainApiName}.ns.${namespace}` : `${mainApiName}.ns["${namespace}"]`;
}

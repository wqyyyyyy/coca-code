import { Node } from 'acorn';
import { Itrack } from './animation';
export type Value = any;
export type ScopeValue = any;
export type ScopeType = "function" | "block";
export type Step = () => void;

export interface Istep {
  key: number,
  operation: Step
}

export interface IsimpleValue {
  kind: string,
  value: any,
  get(): any,
  set(value: any): void
}

export interface Iscope {
  type: string,
  globalScope?: ScopeValue,
  declartion: ScopeValue,
  childScope?: ScopeValue,
  parentScope?: ScopeValue,
  get(name: string): Value,
  set(name: string, value: any): Value,
  addChild(scope: Iscope): void,
  declare(name: string, value: Value, kind: string): void,
  varDeclare(name: string, value: Value): void,
  letDeclare(name: string, value: Value): void,
  constDeclare(name: string, value: Value): void
}

export interface Ioptions {
  scope?: Iscope,
  mirrorScope?: Iscope,
  operations?: Istep[]
}

export interface Iiterator {
  node: InodeTypes,
  scope: Iscope,
  mirrorScope: Iscope,
  tracks: Itrack[],
  stateHandler?: IstateHandler,
  code: string,
  operations: Istep[],
  traverse(node: Node, options?: Ioptions): any,
  createScope(type: ScopeType): Iscope,
  createMirroScope(type: ScopeType): Iscope,
  createMirrorOperate(operations: Istep[]): void,
  // createMirrorAnimate(animate: IanimateKey): void,
  // addOperateTrack(operations: Istep[] | undefined, tracks:Itrack[] | undefined): void,
  // storeAddTrack(track: Itrack[]): void,
  // addTrack(track: Itrack): void,
  addOperation(operations: Istep): void
}

export interface IstateHandler {
  updateAst: (ast: object) => void,
  clearAst: () => void,
  updateScope: (scope: Iscope) => void,
  clearScope: () => void,
  updateMirrorScope: (scope: Iscope) => void,
  clearMirrorScope: () => void,
  addOperation: (op: Istep[]) => void,
  clearOperation: () => void,
  updateCurrent: (current: number) => void,
  clearKeys: () => void,
  // updateRenderResult: (result: IrenderResult) => void,
  // addTrack: (track: Itrack) => void,
  clearTracks: () => void
}

// ast shape
const Program = 'Program';
const VariableDeclaration = 'VariableDeclaration';
const VariableDeclartor = 'VariableDeclartor';
const BinaryExpression = 'BinaryExpression';
const Literal = 'Literal';

export interface Icommon {
  start: number,
  end: number
}

export interface Iid {
  type: string,
  name: string,
  start: number,
  end: number
}

interface IprogramNode {
  type: typeof Program,
  body: Node[] | Node,
  sourceType?: string,
  declarations?: IvariableDeclartor[],
}

interface IVariableDecalrations {
  type: typeof VariableDeclaration,
  declarations: IvariableDeclartor[],
  kind: string
}

interface IvariableDeclartor {
  type: typeof VariableDeclartor,
  start: number,
  end: number,
  id: Iid,
  init?: IbinaryExpression
}

interface IbinaryExpression {
  type: typeof BinaryExpression,
  operator: string,
  left: InodeTypes,
  right: InodeTypes,
  start: number,
  end: number
}

export interface Iliteral {
  type: typeof Literal,
  value: any,
  raw: any
}

export interface Iidentifier {
  name: string
}

interface Iexpression {
  expression: any
}

interface IifStatement {
  test: Node,
  consequent: Node,
  alternate?: Node
}

interface IunaryExpression {
  prefix: boolean,
  argument: Node,
  operator: String
}

interface IforStatement {
  init?: Node,
  test: Node,
  update: Node,
  body: Node
}

interface IfuncDeclaration {
  id : Node,
  expression: Boolean,
  generator: Boolean,
  async: Boolean,
  params: Node[],
  body: Node
}

interface IfuncCaller {
  arguments: [],
  callee: Node
}

interface IarrayExpression {
  elements: Node[]
}

export type InodeTypes = 
Icommon &
IprogramNode &
IVariableDecalrations &
IvariableDeclartor &
IbinaryExpression &
Iliteral &
Iidentifier &
Iexpression &
IifStatement &
IunaryExpression &
IforStatement &
IfuncDeclaration &
IfuncCaller &
IarrayExpression;

export interface InodeHandler {
  Program(node: Iiterator): any,
  VariableDeclaration(node: Iiterator): any,
  Literal(node: Iiterator): any,
  UnaryExpression(node: Iiterator): any,
  Identifier(node: Iiterator): any,
  ExpressionStatement(node: Iiterator): any,
  AssignmentExpression(node: Iiterator): void,
  BinaryExpression(node: Iiterator): void,
  IfStatement(node: Iiterator): void,
  BlockStatement(node: Iiterator): void,
  WhileStatement(node: Iiterator): void,
  ForStatement(node:Iiterator): void,
  UpdateExpression(node: Iiterator): void,
  FunctionDeclaration(node: Iiterator): void,
  FunctionExpression(node: Iiterator): [Step, Step],
  CallExpression(node: Iiterator): any,
  ArrayExpression(node: Iiterator): void,
  ReturnStatement(node: Iiterator): any,
  AssignmentExpressionMap: any,
  BinaryExpressionOperatorMap: any,
  unaryoperateMap: any
}

/**
 * about store
 */
export interface Icompiler {
  ast: Node,
  steps: Istep[],
  scope: Iscope,
  mirrorScope: Iscope,
  iterator?: Iiterator,
}
export const UPDATE_AST = 'UPDATE_AST';
export const UPDATE_STEPS = 'UPDATE_STEPS';
export const UPDATE_SCOPE = 'UPDATE_SCOPE';
export const UPDATE_MIRRORSCOPE = 'UPDATE_MIRRORSCOPE';
export const CLEAR_STEPS = 'CLEAR_STEPS';

interface updateAst {
  type: typeof UPDATE_AST,
  payload: object
}

interface updateSteps {
  type: typeof UPDATE_STEPS,
  payload: Istep[]
}

interface updateScope {
  type: typeof UPDATE_SCOPE,
  payload: Iscope
}

interface updateMirrorScope {
  type: typeof UPDATE_MIRRORSCOPE,
  payload: Iscope
}

interface clearSteps {
  type: typeof CLEAR_STEPS
}

export type compilerActionTypes = 
updateAst |
updateSteps |
updateScope |
updateMirrorScope |
clearSteps;
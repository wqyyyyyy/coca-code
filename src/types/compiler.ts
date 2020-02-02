import { IanimateKey, DocType } from "./store";
import { IrenderResult, Itrack } from "./animate";
export type Ivalue = any;
export type IscopeValue = any;
export type Ioperation = () => void;

export interface IsimpleValue {
  kind: string,
  value: any,
  get(): any,
  set(value: any): void
}

export interface Iscope {
  type: string,
  globalScope?: IscopeValue,
  declartion: IscopeValue,
  childScope?: IscopeValue,
  parentScope?: IscopeValue,
  get(name: string): Ivalue,
  set(name: string, value: any): Ivalue,
  addChild(scope: Iscope): void,
  declare(name: string, value: Ivalue, kind: string): void,
  varDeclare(name: string, value: Ivalue): void,
  varDeclare(name: string, value: Ivalue): void,
  varDeclare(name: string, value: Ivalue): void
}

export interface Ioptions {
  scope?: Iscope,
  mirrorScope?: Iscope,
}

export interface Iiterator {
  node: InodeTypes,
  scope: Iscope,
  mirrorScope: Iscope,
  tracks: Itrack[],
  stateHandler?: IstateHandler,
  code: string,
  operations: Ioperation[],
  traverse(node: object, options?: object, track?: Itrack[], operations?: Ioperation[]): any,
  createScope(type: string): Iscope,
  createMirrorOperate(operations: Ioperation[]): void,
  createMirrorAnimate(animate: IanimateKey): void,
  addOperateTrack(operations: Ioperation[], tracks:Itrack[]): void,
  storeAddTrack(track: Itrack[]): void,
  addTrack(track: Itrack): void,
  addOperation(operations: Ioperation): void
}

export interface Icompiler {
  code: string,
  ast: object,
  operations: Ioperation[],
  iterator?: Iiterator,
  scope: Iscope,
  mirrorScope: Iscope,
  stateHandler: IstateHandler
}

export interface IstateHandler {
  updateAst: (ast: object) => void,
  clearAst: () => void,
  updateScope: (scope: Iscope) => void,
  clearScope: () => void,
  updateMirrorScope: (scope: Iscope) => void,
  clearMirrorScope: () => void,
  addOperation: (op: Ioperation[]) => void,
  clearOperation: () => void,
  updateCurrent: (current: number) => void,
  clearKeys: () => void,
  updateRenderResult: (result: IrenderResult) => void,
  addTrack: (track: Itrack) => void,
  clearTracks: () => void
}

// ast shape
const Program = 'Program';
const VariableDeclaration = 'VariableDeclaration';
const VariableDeclartor = 'VariableDeclartor';
const BinaryExpression = 'BinaryExpression';
const Literal = 'Literal';

export interface ItarversBack {
  value: any,
  animate: IanimateKey
}

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
  body: object[],
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
  right: InodeTypes
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

export type InodeTypes = 
Icommon &
IprogramNode &
IVariableDecalrations &
IvariableDeclartor &
IbinaryExpression &
Iliteral &
Iidentifier &
Iexpression;

export interface InodeHandler {
  Program(node: Iiterator): any,
  VariableDeclaration(node: Iiterator): any,
  Literal(node: Iiterator): any,
  // nodeIterator(node: Iiterator): any,
  Identifier(node: Iiterator): any,
  ExpressionStatement(node: Iiterator): any,
  AssignmentExpressionMap: any,
  AssignmentExpression(node: Iiterator): void,
  // BinaryExpression(node: Iiterator): void,
  // IfStatement(node: Iiterator): void,
  // BlockStatement(node: Iiterator): void,
  // FunctionDeclaration(node: Iiterator): void,
}


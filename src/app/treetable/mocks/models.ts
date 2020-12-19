export interface Folder {
  name: string;
  owner: string;
  protected: boolean;
  backup: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  owner: string;
}

export interface book {
  id: string;
  start: string;
  end: string;
  sollAZ: string;
  istAZ: string;
  sollPause: string;
  istPause: string;
  überstunden: string;
}

/**
 * IdGeneratorService Port — Guardloop domain prefixes.
 */

import type { DomainCode } from '@guardloop/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  uscId(): string;
  polId(): string;
  asmId(): string;
  ctlId(): string;
  monId(): string;
  rmdId(): string;
  expId(): string;
  rptId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
